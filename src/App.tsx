
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useMemo, useState } from "react";
import Refraction from "./components/Pefraction";
import RetroModel from "./components/Retro";

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any
}

export default function App() {
  const [page, setPage] = useState(1);


  const models = useMemo(() => {
    switch (page) {
      case 2:
        return <Refraction onClick={setPage}></Refraction>
      case 1:
        return <RetroModel onClick={setPage}></RetroModel>
      default:
        break
    }
  }, [page])

  return (
    <div>
      {models}
    </div>

  );
}
