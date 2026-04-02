import React, { useState } from "react";
import API from "../api/axios";
import { Wheat, PlusCircle } from "lucide-react";

const YemCard = () => {
  const [data, setData] = useState({ nomi: "", miqdori: "", narxi: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/yem/add", data);
      if (res.data.success) {
        alert("Yem muvaffaqiyatli saqlandi va Telegramga yuborildi! ✅");
        setData({ nomi: "", miqdori: "", narxi: "" }); // Formani tozalash
      }
    } catch (err) {
      alert("Xatolik! Backend yoniqmi dostim?");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <Wheat color="#2ecc71" size={24} />
          <h3>Yem-xashak kiritish</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Yem nomi (masalan: Arpa)"
            value={data.nomi}
            onChange={(e) => setData({ ...data, nomi: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Miqdori (kg)"
            value={data.miqdori}
            onChange={(e) => setData({ ...data, miqdori: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Narxi (so'm)"
            value={data.narxi}
            onChange={(e) => setData({ ...data, narxi: e.target.value })}
            required
          />
          <button type="submit" className="btn-add">
            <PlusCircle size={18} /> Saqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default YemCard;
