var app;

$(document).ready(function() {
	app = new App();
	app.init();
});

function App() {
	var self = this;
	var id = 0;
	var btnAdd = $('#btnAdd');
	var todoList = $('#todo-list');
	var inputNewTask = $('#inputNewTask');
	var cbCheckAll = $('#cbCheckAll');
	var btnDelDone = $('#btnDelDone');

	if(!(self instanceof App)) {
		return new App();
	}

	self.init = function() {
		btnAdd.on('click', self.addTask);
		
		cbCheckAll.on('click', self.onCheckAll);

		btnDelDone.on('click', self.delDone);

		inputNewTask.on('keyup', self.onNewTaskKeyUp);
		
		inputNewTask.focus();

	};

	self.addTask = function(e) {
		var newId = self.getId();
		var text = $.trim(inputNewTask.val());
		
		if(text) {
			var newTask = $('<li class="collection-item" data-id="' + newId + '"></li>');

			var cb = $(['<input id="cb' + newId + ' "type="checkbox" name="cb' + newId + '" value="">',
	                	'<label for="cb' + newId + '" class="title">' + text + '</label>'].join(''));

			cb.on('click', self.setDone);
			cb.on('dblclick', self.editTask);

			var btnDel = $('<a href="" class="secondary-content"><i class="material-icons orange-text text-lighten-1">delete</i></a>');

			btnDel.on('click', self.deleteTask);
			
			newTask.append(cb);
			newTask.append(btnDel);

			inputNewTask.parent().before(newTask);
			inputNewTask.val('');
		}
		
		btnAdd.addClass('disabled');
		inputNewTask.focus();
	};

	self.onNewTaskKeyUp = function(e) {
		if(e.keyCode === 13) {
			self.addTask(e);
			return;
		}

		var text = $.trim(inputNewTask.val());
		var disabled = btnAdd.hasClass('disabled');
		if(text && disabled) {
			btnAdd.removeClass('disabled');
		} else if(!text && !disabled) {
			btnAdd.addClass('disabled');
		}
	};

	self.deleteTask = function(e) {
		e.preventDefault();

		var id = $(e.currentTarget).parent().attr('data-id');
		
		$('[data-id="' + id + '"]').remove();
	};

	self.editTask = function(e) {
		var label = $(e.currentTarget);
		var text = label.text();


		var editEnd = function() {
			taskEdit.replaceWith(label);
			label.on('click', self.setDone);
			label.on('dblclick', self.editTask);
		};

		var taskEdit = $('<input type="text" name="taskEdit" value="' + text + '" placeholder="" id="taskEdit">');

		label.replaceWith(taskEdit);

		taskEdit.select();
		taskEdit.on('blur', editEnd);

		taskEdit.on('keyup', function(e) {
			switch(e.keyCode) {
			// Enter
			case 13:
				var newText = $.trim(taskEdit.val());
				
				if(newText) {
					label.text(newText);
				}

				editEnd();
				break;
			//Escape
			case 27:
				editEnd();
				break;
			}
		});
	};

	self.setDone = function(e) {
		var label = $(e.currentTarget);
		var cb = label.prev();
		var checked = cb.prop('checked');

		if(checked) {
			cb.prop('checked', false);
			label.removeClass('task-done');
		} else {
			cb.prop('checked', true);
			label.addClass('task-done');
		}

	};

	self.setAllDone = function() {
		$('#todo-list li input[type="checkbox"]:not(:checked)').each(function(i, el) {
			var $el = $(el);
			$el.prop('checked', true);
			$el.next().addClass('task-done');

		});
	};

	self.setAllUndone = function() {
		$('#todo-list li input[type="checkbox"]:checked').each(function(i, el) {
			var $el = $(el);
			$el.prop('checked', false);
			$el.next().removeClass('task-done');
		});
	};

	self.onCheckAll = function (e) {
		var checked = cbCheckAll.prop('checked');

		if(checked) {
		 	self.setAllDone();
		} else {
			self.setAllUndone();
		}
	}

	self.delDone = function(e) {
		$('#todo-list li input[type="checkbox"]:checked').each(function(i, el) {
			$(el).parent().remove();
		});

		cbCheckAll.prop('checked', false);
	};

	self.getId = function() {
		return id++;
	};


	return self;
}