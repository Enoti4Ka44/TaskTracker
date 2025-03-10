import "./style/CategoryCard.css";

export default function CategoryCard(props) {
  return (
    <>
      <section className="category-container">
        <div className="category-text">
          <p>Категория:</p>
          <h3>{props.name}</h3>
        </div>
        <div className="category-btns">
          <button className="btn-card">Изменить</button>
          <button
            className="btn-card"
            onClick={(e) => {
              e.stopPropagation();
              props.onDeleteCategory(props.id);
            }}
          >
            Удалить
          </button>
        </div>
      </section>
    </>
  );
}
