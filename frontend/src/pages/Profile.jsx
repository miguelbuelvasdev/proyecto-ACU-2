import React, { useEffect, useState } from "react";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    capacity: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  const restaurantTypeMap = {
    "Restaurante Tradicional": "restaurant",
    "Comida Rápida": "fast_food",
    Cafetería: "cafeteria",
    "Food Truck": "food_truck",
    Catering: "catering",
    "Hotel Restaurant": "hotel_restaurant",
    "Bar & Grill": "bar_grill",
    Otro: "other",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/user/${userId}`);
        const data = await res.json();
        console.log("Perfil cargado:", data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          capacity: data.restaurant?.capacity || "",
          category: data.restaurant?.category || "",
        });
      } catch {
        setMessage("Error al cargar el perfil");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userId, API_BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const body = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        restaurant: {
          capacity: Number(form.capacity),
          category: form.category,
        },
      };
      if (form.password) {
        body.password_hash = form.password;
      }
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMessage("Perfil actualizado correctamente");
        setEdit(false);
        setForm((prev) => ({ ...prev, password: "" }));
      } else {
        setMessage("Error al actualizar el perfil");
      }
    } catch {
      setMessage("Error de red al actualizar el perfil");
    }
  };

  if (loading) return <div className="p-8">Cargando perfil...</div>;

  return (
    <div className="max-w-xl p-8 mx-auto mt-6 bg-white shadow rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-[#256B3E]">Mi Perfil</h1>
      {!edit ? (
        // Vista solo lectura
        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              disabled
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="address"
              value={form.address}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Comanda (Diaria)
            </label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              disabled
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Categoría</label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                disabled
                onChange={handleChange}
                className={`w-full py-2 pl-3 pr-4 border rounded appearance-none
        bg-gray-100 text-gray-500 cursor-not-allowed
      `}
              >
                <option value="">Selecciona un tipo</option>
                {Object.entries(restaurantTypeMap).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {message && (
            <div className="text-sm text-center text-[#F4A300]">{message}</div>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="px-6 py-2 bg-[#256B3E] text-white rounded-xl font-bold"
            >
              Editar
            </button>
          </div>
        </div>
      ) : (
        // Formulario editable
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              disabled={!edit}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="address"
              value={form.address}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Comanda (Diaria)
            </label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              disabled={!edit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Categoría</label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                disabled={!edit}
                onChange={handleChange}
                className={`w-full py-2 pl-3 pr-4 border rounded appearance-none
        ${
          !edit
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-white text-black"
        }
      `}
              >
                <option value="">Selecciona un tipo</option>
                {Object.entries(restaurantTypeMap).map(([label, value]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {message && (
            <div className="text-sm text-center text-[#F4A300]">{message}</div>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#F4A300] text-white rounded-xl font-bold"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="px-6 py-2 bg-gray-200 text-[#256B3E] rounded-xl font-bold"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
