import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Wheat, PlusCircle } from "lucide-react";

const YemCard = () => {
  // Sahifa yuklanganda LocalStorage-dan ma'lumotni olish
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("yem_form");
    return saved
      ? JSON.parse(saved)
      : { nomi: "Arpa", miqdori: "100", narxi: "" };
  });

  // Har safar ma'lumot o'zgarganda LocalStorage-ga saqlash
  useEffect(() => {
    localStorage.setItem("yem_form", JSON.stringify(data));
  }, [data]);

  const yemTurlari = ["Arpa", "Bug'doy", "Aralashma", "Sechka", "Somon"];

  // Miqdorlar ro'yxati (1 tonnagacha 50 kg qadam bilan)
  const kgMiqdorlari = [];
  for (let i = 50; i <= 1000; i += 50) kgMiqdorlari.push(i);

  // Somon uchun voglar
  const vogMiqdorlari = [];
  for (let i = 10; i <= 100; i += 10) vogMiqdorlari.push(i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1000 dan kichik narx yozilsa 000 qo'shish
      let finalNarxi = Number(data.narxi);
      if (finalNarxi < 1000) finalNarxi *= 1000;

      const res = await API.post("/yem/add", { ...data, narxi: finalNarxi });
      if (res.data.success) {
        alert("Yem muvaffaqiyatli saqlandi! ✅");
        const resetData = { nomi: "Arpa", miqdori: "100", narxi: "" };
        setData(resetData);
        localStorage.removeItem("yem_form");
      }
    } catch (err) {
      alert("Xatolik yuz berdi!");
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
          <label>Yem turi:</label>
          <select
            value={data.nomi}
            onChange={(e) =>
              setData({
                ...data,
                nomi: e.target.value,
                miqdori: e.target.value === "Somon" ? "10" : "100",
              })
            }
          >
            {yemTurlari.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <label>Miqdori ({data.nomi === "Somon" ? "Vog" : "Kg"}):</label>
          <select
            value={data.miqdori}
            onChange={(e) => setData({ ...data, miqdori: e.target.value })}
          >
            {data.nomi === "Somon"
              ? vogMiqdorlari.map((v) => (
                  <option key={v} value={v}>
                    {v} vog
                  </option>
                ))
              : kgMiqdorlari.map((k) => (
                  <option key={k} value={k}>
                    {k} kg
                  </option>
                ))}
          </select>

          <label>Narxi (so'm):</label>
          <input
            type="number"
            placeholder="Masalan: 70 yoki 70000"
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
