// Basic client-side validation helper (enhance HTML pattern validation)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#addForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        alert('Please correct the highlighted fields.');
      }
    });
  }
});
