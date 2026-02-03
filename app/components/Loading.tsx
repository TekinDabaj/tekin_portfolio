"use client";

export default function Loading() {
  return (
    <>
      <style jsx>{`
        @keyframes configure-clockwise {
          0% {
            transform: rotate(0);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes configure-xclockwise {
          0% {
            transform: rotate(45deg);
          }
          25% {
            transform: rotate(-45deg);
          }
          50% {
            transform: rotate(-135deg);
          }
          75% {
            transform: rotate(-225deg);
          }
          100% {
            transform: rotate(-315deg);
          }
        }

        .configure-border-1 {
          animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
        }

        .configure-border-2 {
          animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
        }
      `}</style>

      <div className="w-[300px] h-[300px] flex justify-center items-center bg-transparent relative">
        <div className="configure-border-1 w-[115px] h-[115px] p-[3px] absolute flex justify-center items-center bg-[#fb5b53]">
          <div className="w-full h-full bg-black"></div>
        </div>
        <div className="configure-border-2 w-[115px] h-[115px] p-[3px] absolute flex justify-center items-center bg-[rgb(63,249,220)] rotate-45">
          <div className="w-full h-full bg-black"></div>
        </div>
      </div>
    </>
  );
}
