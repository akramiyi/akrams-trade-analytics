const Card = ({ title, value }: { title: string, value: string }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;
