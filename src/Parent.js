import { useState } from "react";
import { Counter } from "./Counter";

export function Parent() {
    let [count, setCount] = useState(0)
    let incrCounterChange = () => {
        setCount(count + 2)
    }
    let decrCounterChange = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    let styleH1 = { textAlign: "center", color: "brown", textDecoration: "underline" }
    let styleDiv = { display: "flex", justifySelf: "center", border: "2px solid brown", borderRadius: "8px", backgroundColor: "bisque" }
    let styleDecrButton = { width: "50px", color: "red", fontSize: "30px", backgroundColor: "aqua", border: "none", borderRight: "1px solid brown", borderRadius: "8px" }
    let styleIncrButton = { width: "50px", color: "red", fontSize: "30px", backgroundColor: "aqua", border: "none", borderLeft: "1px solid brown", borderRadius: "8px" }
    return <>
        <h1 style={styleH1}>Counter Increment & Decrement</h1>
        <div style={styleDiv}>
            <button onClick={decrCounterChange} style={styleDecrButton}>-</button>
            <Counter countValue={count} />
            <button onClick={incrCounterChange} style={styleIncrButton}>+</button>
        </div>
    </>
}