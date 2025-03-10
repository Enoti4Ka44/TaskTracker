export default function CompleteButton(props) {
  return (
    <>
      {props.data.isCompleted || props.data.status == "COMPLETED" ? (
        <button className="btn-card border-green">Выполнено</button>
      ) : (
        <button
          className="btn-card"
          onClick={() => {
            props.onCompleteTask(props.data.id);
          }}
        >
          Завершить
        </button>
      )}
    </>
  );
}
