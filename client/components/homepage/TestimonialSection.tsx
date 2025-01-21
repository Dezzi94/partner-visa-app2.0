import Image from "next/image";

interface TestimonialProps {
  testimonials: Array<{
    name: string;
    company: string;
    quote: string;
    imageId: number;
  }>;
}

export default function TestimonialSection({ testimonials }: TestimonialProps) {
  return (
    <section
      className="py-20 bg-gray-50 dark:bg-gray-800 w-full"
      data-testid="testimonial-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={`testimonial-${testimonial.imageId}`}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                  <Image
                    src={`/testimonials/${testimonial.imageId}.jpg`}
                    alt={`${testimonial.name}'s avatar`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
