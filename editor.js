<!-- Это внешний файл editor.js -->
document.addEventListener('DOMContentLoaded', function() {
  // Создаем интерфейс редактора
  const editorHTML = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; padding: 20px; }
      .header { margin-bottom: 15px; }
      h2 { font-size: 1.4rem; color: #333; margin-bottom: 5px; }
      .info { color: #666; font-size: 0.95rem; margin-bottom: 15px; }
      textarea { 
        width: 100%; 
        min-height: 300px; 
        padding: 15px; 
        border: 1px solid #ddd; 
        border-radius: 8px; 
        font-size: 1rem; 
        resize: vertical; 
      }
      .buttons { 
        display: flex; 
        gap: 10px; 
        margin-top: 15px; 
      }
      button { 
        flex: 1; 
        padding: 12px; 
        border: none; 
        border-radius: 6px; 
        font-weight: bold; 
        cursor: pointer;
      }
      #save-btn { background: #34a853; color: white; }
      #delete-btn { background: #ea4335; color: white; }
      #cancel-btn { background: #f1f1f1; }
    </style>
    <div class="header">
      <h2>Редактор примечаний</h2>
      <div class="info">
        <div>👤 ${window.name}</div>
        <div>📍 Строка I${window.row}</div>
      </div>
    </div>
    <textarea id="note-text">${window.note}</textarea>
    <div class="buttons">
      <button id="save-btn">Сохранить</button>
      ${window.note ? '<button id="delete-btn">Удалить</button>' : ''}
      <button id="cancel-btn">Отмена</button>
    </div>
  `;
  
  document.body.innerHTML = editorHTML;
  
  // Обработчики событий
  document.getElementById('save-btn').addEventListener('click', function() {
    const text = document.getElementById('note-text').value;
    google.script.run.saveNote(window.row, text);
    google.script.host.close();
  });
  
  if (window.note) {
    document.getElementById('delete-btn').addEventListener('click', function() {
      if (confirm('Удалить примечание?')) {
        google.script.run.deleteNote(window.row);
        google.script.host.close();
      }
    });
  }
  
  document.getElementById('cancel-btn').addEventListener('click', function() {
    google.script.host.close();
  });
  
  // Автофокус
  document.getElementById('note-text').focus();
});