import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />
      <p className="text-center text-gray-400 m-4">Welcome to Recipe Master</p>
      <main className="px-4 sm:px-6 md:px-[8%] pb-20">
        <Mainroutes />
      </main>
    </div>
  );
};

export default App;
