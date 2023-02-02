import Draggable from "react-draggable";

export default function PokeCard({ img, hp }) {
  return (
    <Draggable>
    <div className="m-16 w-52" key={hp}>
      <img src={img} />
    </div>
    </Draggable>
  );
}
