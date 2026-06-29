import { useEffect, useState } from "react";

export default function Announcements() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    startTime: "",
    endTime: "",
    shopId: "",
  });

  const [announcements, setAnnouncements] = useState<any[]>([]);

  const fetchAnnouncements = async () => {
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data.data || []);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const submit = async () => {
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (result.success) {
      alert("Announcement Created!");
      setForm({
        title: "",
        message: "",
        startTime: "",
        endTime: "",
        shopId: "",
      });
      fetchAnnouncements();
    }
  };

  return (
    <div style={{ padding: 24, background: "#f6f6f7", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <h1 style={{ marginBottom: 20 }}>📢 Announcement Dashboard</h1>

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

      {/* LIST */}
      <h3>Existing Announcements</h3>

      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        announcements.map((item: any) => (
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
          </div>
        ))
      )}
    </div>
  );
}