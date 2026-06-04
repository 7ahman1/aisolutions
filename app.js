const supabaseUrl = "https://wvfqmbwazpjbiutijlqs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZnFtYndhenBqYml1dGlqbHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzgxNTQsImV4cCI6MjA5NTk1NDE1NH0.W7oh47HhgIVixJ0iZT4tKOa_MxTzwfsa0v4RlyQOgCs";
const whatsappNumber = "919538688780";
const storageBucket = "images";
const client = typeof supabase !== "undefined" ? supabase.createClient(supabaseUrl, supabaseKey) : null;


const services = [
  {
    name: "Web Development",
    desc: "Create modern, responsive, and high-performing websites that convert visitors into customers. We build professional digital experiences designed for growth and success.",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_eow0rdeow0rdeow0.png"
 
  },
  {
    name: "SEO Optimization",
    desc: "Improve search rankings, increase organic traffic, and drive more qualified leads to your website. Get discovered by customers actively searching for your services.",
    price: "$149",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_x6pd25x6pd25x6pd.png"
  },
  {
    name: "LinkedIn Growth",
    desc: "Transform your LinkedIn presence into a powerful networking and lead-generation machine. Grow your audience, increase engagement, and attract valuable business opportunities.",
    price: "$99",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_otmd3gotmd3gotmd.png"
  },
  {
    name: "Google Optimization",
    desc: "Enhance your visibility across Google Search, Maps, and business listings. Improve local discoverability and attract more customers through optimized online presence.",
    price: "$129",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_544yro544yro544y.png"
  },
  {
    name: "Personal Branding",
    desc: "Build a powerful personal brand that establishes authority, increases visibility, and creates opportunities. We help professionals stand out, grow influence, and become trusted industry leaders.",
    price: "$149",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_gu3yvvgu3yvvgu3y.png"
  },
  {
    name: "Social Media Growth",
    desc: "Expand your reach, engage your audience, and strengthen your online presence. Our growth strategies help businesses build communities and convert followers into customers.",
    price: "$129",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_6790op6790op6790.png"
  },

  {
    name: "Whatsapp Business and API ",
    desc: "Turn conversations into conversions with WhatsApp Business solutions. Automate communication, engage customers instantly, and streamline your sales process for faster growth.",
    price: "$99",
    imagePath: "https://wvfqmbwazpjbiutijlqs.supabase.co/storage/v1/object/public/images/Gemini_Generated_Image_5ncw9k5ncw9k5ncw.png"
  }

  
];

// normalize and expose services to other scripts
for (let i = 0; i < services.length; i++) {
  if (!services[i].id) services[i].id = `local-${Date.now()}-${i}`;
}

window.services = services;

function getServiceImageUrl(path) {
  if (!path) return "https://via.placeholder.com/600x400?text=Service+Image";
  if (/^https?:\/\//i.test(path)) return path;
  if (!client) return `https://via.placeholder.com/600x400?text=${encodeURIComponent(path)}`;
  const safePath = path.split("/").map(encodeURIComponent).join("/");
  const { data, error } = client.storage.from(storageBucket).getPublicUrl(safePath);
  if (error) {
    console.warn("Supabase storage public URL error:", path, error);
    return "https://via.placeholder.com/600x400?text=Service+Image";
  }
  return data?.publicUrl || "https://via.placeholder.com/600x400?text=Service+Image";
}

function renderLandingServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = "";
  window.services.forEach(s => {
    const imageUrl = s.img || getServiceImageUrl(s.imagePath);
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openModal(s.name);
    card.innerHTML = `
      <img src="${imageUrl}" alt="${s.name} illustration" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400?text=Service+Image';">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
   
    `;
    grid.appendChild(card);
  });
}

window.renderLandingServices = renderLandingServices;

window.upsertLocalService = function(service) {
  if (!service) return;
  if (!service.id) {
    service.id = `local-${Date.now()}`;
  }
  const idx = window.services.findIndex(s => s.id === service.id);
  if (idx >= 0) {
    window.services[idx] = Object.assign({}, window.services[idx], service);
  } else {
    window.services.push(service);
  }
  renderLandingServices();
};

window.deleteLocalService = function(id) {
  if (!id) return;
  window.services = window.services.filter(s => s.id !== id);
  renderLandingServices();
};

window.addEventListener("load", renderLandingServices);

// MODAL
function openModal(service) {
  document.getElementById("service").value = service;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

async function submitBooking() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value.trim();

  if (!name || !email || !service) {
    alert("Please fill all fields");
    return;
  }

  try {
    console.log("Submitting booking with data:", { name, email, service });

    if (!whatsappNumber || whatsappNumber === "YOUR_WHATSAPP_NUMBER") {
      alert("Please set your WhatsApp number in app.js before sending booking messages.");
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hello! I would like to book the ${service} service. Name: ${name}. Email: ${email}.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    if (!client) {
      alert("Supabase connection not initialized. Opening WhatsApp for booking instead.");
      window.location.href = whatsappUrl;
      return;
    }

    const { data, error } = await client
      .from("bookings")
      .insert([
        {
          name,
          email,
          service,
          status: "pending",
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error("Supabase error:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error);
      alert(`Error: ${error.message || "Failed to submit booking"}`);
      return;
    }

    console.log("Booking submitted successfully:", data);
    alert("Request submitted successfully! Opening WhatsApp to confirm your booking.");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("service").value = "";
    closeModal();
    window.location.href = whatsappUrl;
  } catch (err) {
    console.error("Error:", err);
    console.error("Error message:", err.message);
    alert("Error submitting booking: " + (err.message || "Unknown error"));
  }
}
