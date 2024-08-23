import Image from "next/image";

export default function AboutUsPage() {
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 rounded break-words border border-1 border-gray-300 container mx-auto sm:px-4 text-gray-900 bg-gray-100 overlay"
        style={{ marginTop: "20px" }}
      >
        <Image
          src="/4.svg"
          className="rounded w-1/2"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          alt="sustain line picture"
        />
        <div className="absolute inset-y-0 inset-x-0 p-6 mt-5 ms-5">
          <h1 className="mb-3 text-2xl fw-semibold">About Us</h1>
          <p className="mb-0 text-sm">
            We thrive to become the best community that connects
          </p>
          <p className="mb-0 text-sm">
            local producers and you. We do it all for our world
          </p>
        </div>

        <Image
          className="w-1/4 pt-3 z-3"
          src="/3.svg"
          width={0}
          height={0}
          alt="human working with energy plan"
        />
      </div>

      <div className="container mt-5 pb-5">
        <div className="flex flex-wrap ">
          <div className="relative flex-grow max-w-full flex-1 px-4">
            <h1>Our Mission</h1>
            <Image
              src="/4.svg"
              width={0}
              height={0}
              className="w-full rounded mt-5"
              alt="world mission"
            />
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4">
            <h2>Who the F we are??</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
            <h2>What We F</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
            <h2>How to F</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
            <h2>What We F</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mb-5">Our Team</h2>
        <div className="flex flex-wrap">
          <div className="relative flex-grow max-w-full flex-1 px-4 text-center">
            <h3 className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded-full py-2 px-4 text-gray-600">
              Ardy
            </h3>
            <br />
            <Image
              width={0}
              height={0}
              src="/7.svg"
              className="w-full"
              alt="Ardys Picture"
            />
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4 text-center">
            <h3 className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded-full py-2 px-4 text-gray-600">
              Quraisy
            </h3>
            <br />
            <Image
              src="/8.svg"
              width={0}
              height={0}
              className="w-full"
              alt="Widyas Picture"
            />
          </div>
          <div className="relative flex-grow max-w-full flex-1 px-4 text-center">
            <h3 className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded-full py-2 px-4 text-gray-600">
              Widya
            </h3>
            <br />
            <Image
              src="/9.svg"
              width={0}
              height={0}
              className="w-full"
              alt="Quraisy Picture"
            />
          </div>
        </div>
      </div>
    </>
  );
}
