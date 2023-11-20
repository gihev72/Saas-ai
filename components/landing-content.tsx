"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonilas = [
  {
    name: "Mikko",
    avatar: "M",
    title: "Data Scientist",
    description: "this is best AI tool I've used.",
  },
  {
    name: "Anna",
    avatar: "M",
    title: "Musician",
    description: "Nice and conviniebt to use!",
  },
  {
    name: "Robert",
    avatar: "R",
    title: "Freelancer",
    description: "helpful tool that everybody should use it.",
  },
  {
    name: "Sara",
    avatar: "S",
    title: "Video Editor",
    description: "there is no limits for my creativity with this app!",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h1 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonial
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonilas.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm font-light">
                    {" "}
                    {item.title}
                  </p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 relative">
                <div className="absolute top-2 h-16 w-[4px] bg-sky-400" />
                <p className="pl-4 font-light">{item.description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
