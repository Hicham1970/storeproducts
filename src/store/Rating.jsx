function Rating({ rate }) {
  return (
    <>
      <span className="bs5-badge-pill rounded-pill bg-primary wy-2 px-3 fs-6 text-warning">
        {rate}/5
      </span>
    </>
  );
}

export default Rating;
