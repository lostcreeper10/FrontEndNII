import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      {/* ... other nav code ... */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
}
