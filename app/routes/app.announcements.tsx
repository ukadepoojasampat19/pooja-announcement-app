import { useEffect, useState } from "react";

export default function Announcements() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    startTime: "",
    endTime: "",
    shopId: "",
  });

<<<<<<< HEAD
  const [announcements, setAnnouncements] = useState<any[]>([]);

=======
  const [announcements, setAnnouncements] = useState([]);

  // FETCH DATA
>>>>>>> d65b5b66b93eec5eaca344fe98d1f38b86f0cdb0
  const fetchAnnouncements = async () => {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data.data || []);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

<<<<<<< HEAD
=======
  // CREATE DATA
>>>>>>> d65b5b66b93eec5eaca344fe98d1f38b86f0cdb0
  const submit = async () => {
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (result.success) {
<<<<<<< HEAD
      alert("Announcement Created!");
      setForm({
        title: "",
        message: "",
        startTime: "",
        endTime: "",
        shopId: "",
      });
      fetchAnnouncements();
=======
      alert("Announcement Created Successfully!");
      fetchAnnouncements(); // refresh list
    } else {
      alert("Something went wrong!");
>>>>>>> d65b5b66b93eec5eaca344fe98d1f38b86f0cdb0
    }
  };

  return (
    <div style={{ padding: 24, background: "#f6f6f7", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <h1 style={{ marginBottom: 20 }}>📢 Announcement Dashboard</h1>

<<<<<<< HEAD
      {/* FORM CARD */}
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <h3>Create Announcement</h3>

        <div style={{ display: "grid", gap: 10 }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ padding: 10 }}
          />

          <input
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ padding: 10 }}
          />

          <input
            type="datetime-local"
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            style={{ padding: 10 }}
          />

          <input
            type="datetime-local"
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            style={{ padding: 10 }}
          />

          <input
            placeholder="Shop ID"
            onChange={(e) => setForm({ ...form, shopId: e.target.value })}
            style={{ padding: 10 }}
          />

          <button
            onClick={submit}
            style={{
              padding: 12,
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Create Announcement
          </button>
        </div>
      </div>
=======
      {/* FORM */}
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <br /><br />

      <input
        type="datetime-local"
        onChange={(e) => setForm({ ...form, startTime: e.target.value })}
      />
      <br /><br />

      <input
        type="datetime-local"
        onChange={(e) => setForm({ ...form, endTime: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Shop ID"
        onChange={(e) => setForm({ ...form, shopId: e.target.value })}
      />
      <br /><br />

      <button onClick={submit}>Create Announcement</button>

      <hr />
>>>>>>> d65b5b66b93eec5eaca344fe98d1f38b86f0cdb0

      {/* LIST */}
      <h3>Existing Announcements</h3>

      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        announcements.map((item: any) => (
<<<<<<< HEAD
          <div
            key={item._id}
            style={{
              background: "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              boxShadow: "0 1px 5px rgba(0,0,0,0.05)"
            }}
          >
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ margin: "5px 0" }}>{item.message}</p>

            <div style={{ fontSize: 12, color: "gray" }}>
              Shop: {item.shopId}
            </div>
=======
          <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <small>Shop: {item.shopId}</small>
>>>>>>> d65b5b66b93eec5eaca344fe98d1f38b86f0cdb0
          </div>
        ))
      )}
    </div>
  );
}