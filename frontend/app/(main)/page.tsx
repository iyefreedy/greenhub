import Image from "next/image";

import heroImage from "@/assets/images/hero-image.png"
import event10 from "@/assets/images/event-10.png"
import event11 from "@/assets/images/event-11.png"
import event12 from "@/assets/images/event-12.png"

export default async function Home() {


  return (
    <main >
      <section className="bg-emerald-50 relative">
        <div className="pt-20 container">
          <header className="p-6 text-center sm:flex ">
            <Image
              src={heroImage}
              alt="Hero image"
              className="w-56 inline-block sm:order-2 md:w-80 lg:w-96 xl:w-full"
              width={0}
              height={0}
              priority
            />
            <div className="sm:order-1">
              <h1 className="mt-8 text-4xl tracking-wider font-semibold md:text-6xl lg:text-8xl sm:text-start">
                Start your journey with{" "}
                <strong className="text-emerald-600">Green Hub</strong>
              </h1>
              <p className="mt-4 text-gray-800 sm:text-start md:text-xl">
                You! Yes you! Let’s start by supporting our{" "}
                <strong>locally produced goods</strong>. You can support us by
                checking our products or become a seller
              </p>
            </div>
          </header>
        </div>
      </section>

      <section className="container mx-auto text-center py-4">
        <h2 className="text-xl text-emerald-400 font-semibold md:text-3xl">
          Upcoming Events
        </h2>

        <div className="flex flex-col justify-center items-center p-4 md:flex-row gap-6">
          <div className="w-72 space-y-2 p-2">
            <Image src={event10} alt="Event 10" width={0} height={0} className="w-full" />
            <h3 className="font-medium text-xl">Organic Farm Products</h3>
            <p>
              Write a couple of sentences describing ​your plans for the coming
              year.
            </p>
            <div className="bg-emerald-600 text-gray-100 rounded-full py-2">
              20 Jan - 25 Jan 2025
            </div>
          </div>
          <div className="w-72 space-y-2 p-2">
            <Image src={event11} alt="Event 11" width={0} height={0} />
            <h3 className="font-medium text-xl">Local Clotings</h3>
            <p>
              Write a couple of sentences describing ​your plans for the coming
              year.
            </p>
            <div className="bg-emerald-600 text-gray-100 rounded-full py-2">
              20 Feb - 27 Feb 2025
            </div>
          </div>
          <div className="w-72 space-y-2 p-2">
            <Image src={event12} alt="Event 12" width={0} height={0} />
            <h3 className="font-medium text-xl">Local Wood Crafts</h3>
            <p>
              Write a couple of sentences describing ​your plans for the coming
              year.
            </p>
            <div className="bg-emerald-600 text-gray-100 rounded-full py-2">
              20 Mar - 27 Mar 2025
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
