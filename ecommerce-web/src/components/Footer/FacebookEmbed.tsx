"use client";

import { information } from "@/config/data/information";
import { FaFacebook } from "react-icons/fa";

const FacebookEmbedComponent = () => {
  return (
    <div className="border rounded-lg overflow-hidden w-[250px] bg-white shadow hover:shadow-md transition-all">
      <div className="p-4 flex items-center gap-3">
        <FaFacebook className="text-blue-600 text-4xl" />
        <div>
          <h3 className="font-medium text-gray-800">{information.shopName}</h3>
          <p className="text-sm text-gray-500">Stay connected with us</p>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 pt-0">
        <a
          href={information.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-2.5 rounded hover:bg-blue-700 transition-colors"
        >
          Visit Page
        </a>
      </div>
    </div>
  );
};

export default FacebookEmbedComponent;
