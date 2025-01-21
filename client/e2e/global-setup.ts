// https://www.bekapod.dev/articles/supabase-magic-login-testing-with-playwright/
import { chromium, request, type FullConfig } from "@playwright/test";

const getLoginMessage = async (username: string) => {
  const inbucketUrl = process.env.INBUCKET_URL || "http://127.0.0.1:54324";

  const requestContext = await request.newContext();
  const messages = await requestContext
    .get(`${inbucketUrl}/api/v1/mailbox/${username}`)
    .then((res) => res.json())
    .then((items) =>
      [...items].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    );
  const latestMessageId = messages[0]?.id;
  console.log("Latest message ID: ", latestMessageId);

  if (latestMessageId) {
    const message = await requestContext
      .get(`${inbucketUrl}/api/v1/mailbox/${username}/${latestMessageId}`)
      .then((res) => res.json());

    const url = message.body.text.match(/http:\/\/[^\s]+/)[0];
    return { url };
  }

  return { url: "" };
};

const waitForNewMagicLink = async (oldUrl: string, username: string) => {
  let triesLeft = 5;
  return new Promise<Awaited<ReturnType<typeof getLoginMessage>>>(
    (resolve, reject) => {
      const interval = setInterval(async () => {
        const check = await getLoginMessage(username);
        if (check.url !== oldUrl) {
          resolve(check);
          clearInterval(interval);
        } else if (triesLeft <= 1) {
          reject(new Error("No new magic link received"));
          clearInterval(interval);
        }
        triesLeft--;
      }, 1000); // Adjusted interval to 1 second for better timing
    }
  );
};

async function globalSetup(config: FullConfig) {
  const username = "james@googlemail.com";
  const { url: oldUrl } = await getLoginMessage(username);
  console.log("Old URL: ", oldUrl);
  console.log("Logging in...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log(
    `Navigating to the login page... ${`${config.webServer?.url}/login`}`
  );
  await page.goto(`${config.webServer?.url}/login`);
  await page.getByLabel("Email address").fill(username);
  await page.getByRole("button", { name: "Send Magic Link" }).click();
  console.log("Waiting for the magic link to arrive...");
  const { url } = await waitForNewMagicLink(oldUrl, username);
  console.log("Magic link received");
  if (url) {
    console.log("Navigating to the magic link...");
    await page.goto(url);
    await page.context().storageState({ path: "storage-state.json" });
  } else {
    throw new Error("Magic link URL not found in the email.");
  }
  await browser.close();
}

export default globalSetup;
