function Pagination() {
  return (
    <div className="btn-group flex gap-3">
      <button className="btn btn-ghost btn-sm hover:bg-gray-50">«</button>
      <button className="btn btn-ghost btn-sm hover:bg-gray-50 btn-active">
        1
      </button>
      <button className="btn btn-ghost btn-sm hover:bg-gray-50">2</button>
      <button className="btn btn-ghost btn-sm hover:bg-gray-50">3</button>
      <button className="btn btn-ghost btn-sm hover:bg-gray-50">4</button>
      <button className="btn btn-ghost btn-sm hover:bg-gray-50">»</button>
    </div>
  );
}

export default Pagination;
