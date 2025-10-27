'use client';

import { User } from "lucide-react";

export default function UserBadge() {
    return (
      <div className="flex items-center gap-2 border-t border-b border-white pb-2">
        <User />
        <div className="flex flex-col ">
          <div>John Doe</div>
          <p>john@gmail.com</p>
        </div>
      </div>
    );
}