import { useSelector } from "react-redux";

const Leaderboard = () => {
  const leaders = useSelector((x) => x.premium.leaders);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Total amount</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((leader) => {
          return (
            <tr key={leader.id}>
              <td>{leader.name}</td>
              <td>{leader.totalExpense}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Leaderboard;
