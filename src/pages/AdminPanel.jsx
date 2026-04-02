import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Trash2, Edit, Check, X, CheckCircle, AlertCircle } from "lucide-react";
import "../assets/Admin.css";

const AdminPanel = () => {
  const [yemlar, setYemlar] = useState([]);
  const [moliya, setMoliya] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Kichik model (Toast) uchun state
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resYem = await API.get("/yem/all");
      const resMoliya = await API.get("/moliya/all");
      setYemlar(resYem.data.data);
      setMoliya(resMoliya.data.data);
    } catch (err) {
      console.error("Ma'lumot olishda xato!");
    }
  };

  // Xabarnomani ko'rsatish funksiyasi
  const triggerToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 5000); // 5 soniya
  };

  const deleteItem = async (type, id) => {
    if (window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
      try {
        await API.delete(`/${type}/delete/${id}`);
        triggerToast("Ma'lumot muvaffaqiyatli o'chirildi! 🗑️", "success");
        fetchData();
      } catch (err) {
        triggerToast("O'chirishda xatolik yuz berdi!", "error");
      }
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData(item);
  };

  const saveEdit = async (type) => {
    try {
      await API.put(`/${type}/update/${editId}`, editData);
      triggerToast("Ma'lumot muvaffaqiyatli yangilandi! ✅", "success");
      setEditId(null);
      fetchData();
    } catch (err) {
      triggerToast("Yangilashda xatolik yuz berdi!", "error");
    }
  };

  return (
    <div className="admin-panel">
      {/* --- O'NG TEPADAGI KICHIK MODEL (TOAST) --- */}
      {toast.show && (
        <div className={`mini-notification ${toast.type}`}>
          {toast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{toast.msg}</span>
          <div className="progress-bar"></div>
        </div>
      )}

      <h1 className="admin-title">Boshqaruv Markazi</h1>

      {/* YEM JADVALI */}
      <div className="table-section">
        <div className="table-header">
          <h3>🌾 Yem-xashak Arxivi</h3>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Miqdori</th>
                <th>Narxi</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {yemlar.map((y) => (
                <tr
                  key={y._id}
                  className={editId === y._id ? "editing-row" : ""}
                >
                  {editId === y._id ? (
                    <>
                      <td>
                        <input
                          className="edit-input"
                          value={editData.nomi}
                          onChange={(e) =>
                            setEditData({ ...editData, nomi: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="number"
                          value={editData.miqdori}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              miqdori: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="number"
                          value={editData.narxi}
                          onChange={(e) =>
                            setEditData({ ...editData, narxi: e.target.value })
                          }
                        />
                      </td>
                      <td className="actions">
                        <button
                          onClick={() => saveEdit("yem")}
                          className="save-btn"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="cancel-btn"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{y.nomi}</td>
                      <td>{y.miqdori} kg</td>
                      <td>{Number(y.narxi).toLocaleString()} so'm</td>
                      <td className="actions">
                        <button
                          onClick={() => startEdit(y)}
                          className="edit-btn"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteItem("yem", y._id)}
                          className="delete-btn"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOLIYA JADVALI */}
      <div className="table-section">
        <div className="table-header">
          <h3>💰 Moliya Arxivi</h3>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Turi</th>
                <th>Summa</th>
                <th>Izoh</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {moliya.map((m) => (
                <tr
                  key={m._id}
                  className={editId === m._id ? "editing-row" : ""}
                >
                  {editId === m._id ? (
                    <>
                      <td>
                        <select
                          className="edit-input"
                          value={editData.turi}
                          onChange={(e) =>
                            setEditData({ ...editData, turi: e.target.value })
                          }
                        >
                          <option value="kirim">Kirim</option>
                          <option value="chiqim">Chiqim</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="number"
                          value={editData.summa}
                          onChange={(e) =>
                            setEditData({ ...editData, summa: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          value={editData.izoh}
                          onChange={(e) =>
                            setEditData({ ...editData, izoh: e.target.value })
                          }
                        />
                      </td>
                      <td className="actions">
                        <button
                          onClick={() => saveEdit("moliya")}
                          className="save-btn"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="cancel-btn"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        className={
                          m.turi === "kirim" ? "text-green" : "text-red"
                        }
                      >
                        {m.turi.toUpperCase()}
                      </td>
                      <td>{Number(m.summa).toLocaleString()} so'm</td>
                      <td>{m.izoh}</td>
                      <td className="actions">
                        <button
                          onClick={() => startEdit(m)}
                          className="edit-btn"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteItem("moliya", m._id)}
                          className="delete-btn"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
