let products = [];
let editIndex = -1; // track editing row

function addProduct() {
  const product = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    desc: document.getElementById("desc").value,
    price: document.getElementById("price").value,
    qty: document.getElementById("qty").value
  };

  if (editIndex === -1) {
    // Add new
    products.push(product);
  } else {
    // Update existing
    products[editIndex] = product;
    editIndex = -1;
  }

  clearForm();
  renderProducts();
}

function renderProducts() {
  const list = document.getElementById("productList");

  if (products.length === 0) {
    list.innerHTML = `<tr><td colspan="6">No products found.</td></tr>`;
    return;
  }

  list.innerHTML = products.map((p, index) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.desc}</td>
      <td>${p.price}</td>
      <td>${p.qty}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    </tr>
  `).join("");

  document.getElementById("total").innerText = products.length;
}

function editProduct(index) {
  const p = products[index];

  // Fill form with existing data
  document.getElementById("id").value = p.id;
  document.getElementById("name").value = p.name;
  document.getElementById("desc").value = p.desc;
  document.getElementById("price").value = p.price;
  document.getElementById("qty").value = p.qty;

  editIndex = index;
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

function clearForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

// Search
document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.desc.toLowerCase().includes(value) ||
    p.id.toString().includes(value)
  );

  const list = document.getElementById("productList");

  list.innerHTML = filtered.map((p, index) => `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.desc}</td>
      <td>${p.price}</td>
      <td>${p.qty}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    </tr>
  `).join("");
});