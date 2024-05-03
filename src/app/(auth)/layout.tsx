type props = {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({children, title}: props) {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white border border-1 border-gray-400 rounded-md w-96 p-8">
      <h1 className="text-lg font-semibold text-center mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}