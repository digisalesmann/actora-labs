// src/app/(main)/profile/[address]/page.tsx

// This defines the expected shape of the URL parameters
interface ProfilePageProps {
  params: {
    address: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="mt-4 text-slate-400">
        Viewing profile for address:
      </p>
      {/* We display the address from the URL to show it's working */}
      <p className="mt-2 text-lg font-mono text-purple-400 break-all">
        {params.address}
      </p>
    </div>
  );
}