import ProductImageUpload from "../../components/admin-view/image-upload";
import { Button } from "../../components/ui/button";
import { addFeatureImage, getFeatureImages } from "../../store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartLegend, ChartLegendContent, ChartTooltip } from "../../components/ui/chart";

import { ChartContainer } from "../../components/ui/chart";

// ✅ Define ChartConfig here if not imported correctly
const ChartConfig = {
  EBook: {
    label: "EBook",
    color: "#2563eb",
  },
  Book: {
    label: "Book",
    color: "#60a5fa",
  },
};

// ✅ Define ChartTooltipContent Component (Fix for undefined error)
const ChartTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded shadow">
        <p className="font-semibold">{payload[0].payload.month}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.fill }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
const chartData2025 = [
  { month: "January", EBook: 500, Book: 250 },
  { month: "February", EBook: 125, Book: 345 },
  { month: "March", EBook: 0, Book: 0 },
  { month: "April", EBook: 0, Book: 0 },
  { month: "May", EBook: 0, Book: 0 },
  { month: "June", EBook: 0, Book: 0 },
  { month: "July", EBook: 0, Book: 0 },
  { month: "August", EBook: 0, Book: 0 },
  { month: "September", EBook: 0, Book: 0 },
  { month: "October", EBook: 0, Book: 0 },
  { month: "November", EBook: 0, Book: 0 },
  { month: "December", EBook: 0, Book: 0 }
];

// ✅ Sample Chart Data
const chartData = [
  { month: "January", EBook: 120, Book: 60 },
  { month: "February", EBook: 250, Book: 180 },
  { month: "March", EBook: 190, Book: 100 },
  { month: "April", EBook: 95, Book: 170 },
  { month: "May", EBook: 180, Book: 110 },
  { month: "June", EBook: 200, Book: 130 },
  { month: "July", EBook: 220, Book: 150 },
  { month: "August", EBook: 260, Book: 170 },
  { month: "September", EBook: 230, Book: 140 },
  { month: "October", EBook: 270, Book: 190 },
  { month: "November", EBook: 290, Book: 160 },
  { month: "December", EBook: 310, Book: 180 },
];

const chartData2023 = [
  { month: "January", EBook: 50, Book: 70 },
  { month: "February", EBook: 280, Book: 190 },
  { month: "March", EBook: 524, Book: 120 },
  { month: "April", EBook: 110, Book: 180 },
  { month: "May", EBook: 200, Book: 40 },
  { month: "June", EBook: 230, Book: 150 },
  { month: "July", EBook: 250, Book: 160 },
  { month: "August", EBook: 280, Book: 150 },
  { month: "September", EBook: 260, Book: 170 },
  { month: "October", EBook: 50, Book: 210 },
  { month: "November", EBook: 320, Book: 190 },
  { month: "December", EBook: 350, Book: 220 },
];


function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
  <section>
     <div className="flex flex-col justify-center items-center p-6 bg-gray-100 rounded-lg shadow-lg">
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Year 2025</h2>
      <ChartContainer config={ChartConfig} className="h-[200px] w-full">
        <BarChart data={chartData2025}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          {/* ✅ Fixed: `ChartTooltipContent` is now properly defined */}
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="EBook" fill="#2563eb" radius={2} />
          <Bar dataKey="Book" fill="#60a5fa" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
      <div className="flex flex-col justify-center items-center p-6 bg-gray-100 rounded-lg shadow-lg">
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Year 2024</h2>
      <ChartContainer config={ChartConfig} className="h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          {/* ✅ Fixed: `ChartTooltipContent` is now properly defined */}
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="EBook" fill="#2563eb" radius={2} />
          <Bar dataKey="Book" fill="#60a5fa" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
    <div className="flex flex-col justify-center items-center p-6 bg-gray-100 rounded-lg shadow-lg">
       <h2 className="text-xl font-semibold text-gray-800 mb-4">Year 2023</h2>
      <ChartContainer config={ChartConfig} className="h-[200px] w-full">
        <BarChart data={chartData2023}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          {/* ✅ Fixed: `ChartTooltipContent` is now properly defined */}
          <Tooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="EBook" fill="#2563eb" radius={2} />
          <Bar dataKey="Book" fill="#60a5fa" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  </section>
  );
}

export default AdminDashboard;
