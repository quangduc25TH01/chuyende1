import { information } from '@/config/data/information';
import { FaPhone, FaFacebookMessenger } from 'react-icons/fa';
import { RiTiktokLine } from 'react-icons/ri';
import { SiZalo } from 'react-icons/si';

export default function SupportButtons() {
  return (
    <div className="fixed bottom-[70px] right-[20px] flex flex-col items-center gap-2 group z-[100]">
      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 p-3 rounded-full text-white shadow-md hover:scale-110 transition-transform"
        >
          <SiZalo size={22} />
        </a>
        <a
          href="https:/tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-3 rounded-full text-white shadow-md hover:scale-110 transition-transform"
        >
          <RiTiktokLine size={22} />
        </a>
        <a
          href="https://m.me"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-3 rounded-full text-white shadow-md hover:scale-110 transition-transform"
        >
          <FaFacebookMessenger size={22} />
        </a>
      </div>
      <div className="relative">
        <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping bg-red-500 opacity-75"></div>
        <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping bg-red-500 opacity-50 delay-200"></div>
        <a
          href={`tel:+${information.phones[0]}`}
          className="relative bg-red-400 hover:bg-red-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-transform transition-shadow duration-300"
        >
          <FaPhone size={22} />
        </a>
      </div>
    </div>
  );
}
