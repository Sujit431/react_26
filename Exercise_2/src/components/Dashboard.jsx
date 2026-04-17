import UserProfile from "./UserProfile";

function Dashboard() {
  return (
    <section className="section">
      <h2 className="section-title">📋 UserProfile Dashboard</h2>
      <div className="card-grid">
        <UserProfile username="Sujit" age={20} isAdmin={true} />
        <UserProfile username="Bishnu" age={25} isAdmin={false} />
        <UserProfile username="Bhagyashree" age={22} />
      </div>
    </section>
  );
}

export default Dashboard;
