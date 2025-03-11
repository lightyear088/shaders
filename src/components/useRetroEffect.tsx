import { useMemo } from "react";
import { RetroEffectImpl } from "./Retro";

export const useRetroEffect = () => {
    const effect = useMemo(() => new RetroEffectImpl(), []);
    return effect;
};

