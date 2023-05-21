import { useRef } from "react";

export default function useDebounce(func: (...params: any) => void, delay: number): Function {
    const timeOutRef = useRef(0);

    function debouncedFunction(...args: any) {
        window.clearTimeout(timeOutRef.current);
        timeOutRef.current = window.setTimeout(() => {
            func(...args);
        }, delay);
    }

    return debouncedFunction;
}