import WalletControls from "@/components/WalletControls";
import PointControls from "@/components/PointControls";

export default function Home() {
  return (
    <div className="flex container mx-auto mt-10 gap-5">
      <div className="basis-1/2 border-2 p-8 rounded-md">
        <WalletControls />
      </div>
      <div className="basis-1/2 border-2 p-8  rounded-md">
        <PointControls />
      </div>
    </div>
  );
}
