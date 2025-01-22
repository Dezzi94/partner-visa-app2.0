import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient();

    // Check authentication using the new getSession method
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = session.user;

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(`${user.id}/${file.name}`, file, {
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // Store file metadata in the documents table
    const { error: dbError } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        filename: file.name,
        path: uploadData.path,
        size: file.size,
      });

    if (dbError) {
      // If database insert fails, try to delete the uploaded file
      await supabase.storage
        .from("documents")
        .remove([`${user.id}/${file.name}`]);

      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      path: uploadData.path,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
