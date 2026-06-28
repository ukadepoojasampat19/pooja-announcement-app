import { useState } from "react";

export default function Announcements() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    startTime: "",
    endTime: "",
    shopId: "",
  });

  const submit = async () => {
    await fetch("/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Announcement Created!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Announcements</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br />

      <input
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <br />

      <input
        type="datetime-local"
        onChange={(e) => setForm({ ...form, startTime: e.target.value })}
      />
      <br />

      <input
        type="datetime-local"
        onChange={(e) => setForm({ ...form, endTime: e.target.value })}
      />
      <br />

      <input
        placeholder="Shop ID"
        onChange={(e) => setForm({ ...form, shopId: e.target.value })}
      />
      <br />

      <button onClick={submit}>Create</button>
    </div>
  );
}