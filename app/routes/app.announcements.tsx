import { useEffect, useState } from "react";

export default function Announcements() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    startTime: "",
    endTime: "",
    shopId: "",
  });

  const [announcements, setAnnouncements] = useState([]);

  // FETCH DATA
  const fetchAnnouncements = async () => {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data.data || []);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // CREATE DATA
  const submit = async () => {
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (result.success) {
      alert("Announcement Created Successfully!");
      fetchAnnouncements(); // refresh list
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Announcements</h2>

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

      {/* LIST */}
      <h3>Existing Announcements</h3>

      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        announcements.map((item: any) => (
          <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <small>Shop: {item.shopId}</small>
          </div>
        ))
      )}
    </div>
  );
}