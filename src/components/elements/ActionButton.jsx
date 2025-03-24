import plusIcon from "../icons/plus.png";

export default function ActionButton(props) {
  return (
    <button
      className="btn-action"
      onClick={() => props.onIsOpen(true, "none")}
      style={{ display: `${props.display}` }}
    >
      {props.text}
      <img src={plusIcon} alt="plus-icon" />
    </button>
  );
}
