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

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      setAnnouncements(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Create announcement
  const submit = async () => {
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        alert("Announcement Created Successfully!");

        setForm({
          title: "",
          message: "",
          startTime: "",
          endTime: "",
          shopId: "",
        });

        fetchAnnouncements();
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        padding: 24,
        background: "#f6f6f7",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>📢 Announcement Dashboard</h1>

      {/* Create Form */}
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          marginBottom: 30,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Create Announcement</h3>

        <div
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={{ padding: 10 }}
          />

          <input
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            style={{ padding: 10 }}
          />

          <input
            type="datetime-local"
            value={form.startTime}
            onChange={(e) =>
              setForm({ ...form, startTime: e.target.value })
            }
            style={{ padding: 10 }}
          />

          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) =>
              setForm({ ...form, endTime: e.target.value })
            }
            style={{ padding: 10 }}
          />

          <input
            placeholder="Shop ID"
            value={form.shopId}
            onChange={(e) =>
              setForm({ ...form, shopId: e.target.value })
            }
            style={{ padding: 10 }}
          />

          <button
            onClick={submit}
            style={{
              background: "#000",
              color: "#fff",
              padding: 12,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Create Announcement
          </button>
        </div>
      </div>

      {/* Announcement List */}
      <h2>Existing Announcements</h2>

      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((item: any) => (
          <div
            key={item._id}
            style={{
              background: "white",
              padding: 18,
              marginBottom: 15,
              borderRadius: 10,
              boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{item.title}</h3>

            <p>{item.message}</p>

            <p>
              <strong>Shop ID:</strong> {item.shopId}
            </p>

            <p>
              <strong>Start:</strong>{" "}
              {new Date(item.startTime).toLocaleString()}
            </p>

            <p>
              <strong>End:</strong>{" "}
              {new Date(item.endTime).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}