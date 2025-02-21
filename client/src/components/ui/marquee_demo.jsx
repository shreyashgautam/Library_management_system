import { cn } from "../../lib/utils";  // ✅ Correct Relative Path
import { Marquee } from "../magicui/marquee";

const reviews = [
  {
    name: "How To Borrow Book?",
    username: "",
    body: "To borrow a book, use this website and then collect it from the library.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Library's Operating Hours?",
    username: "",
    body: "Library hours: 8 AM - 12 PM (Weekdays), 8 AM - 6 PM (Weekends).",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Book Returned Late?",
    username: "",
    body: "Late returns will incur a ₹1 per day fine as a penalty.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Digital Library Available?",
    username: "",
    body: "Yes, we offer a variety of digital books.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "How Long Can I Borrow a Book?",
    username: "",
    body: "You can borrow a book for 7 to 14 days.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Can I Bring Food Inside the Library?",
    username: "",
    body: "No, food and drinks are strictly prohibited.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md",
        "border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-xl transition-all duration-300",
        "dark:border-gray-700 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:hover:shadow-2xl"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full border border-gray-400" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold dark:text-white">{name}</figcaption>
          <p className="text-xs text-gray-600 dark:text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-gray-800 dark:text-gray-300">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900 py-6">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gray-100 dark:from-gray-900"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gray-100 dark:from-gray-900"></div>
    </div>
  );
}