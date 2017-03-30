$(function() {

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
	var self = this; //zagnieżdżenie

	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnBtns = $('<div>').addClass('column-btns');
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete-column').text('del column');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add Card');
	//podpiecie zdarzen
		$columnDelete.click(function() {
			self.removeColumn()
		});
		$columnAddCard.click(function() {
			self.addCard(new Card(prompt("Card title?")));
		});
	//konstruowanie elemmentu columny
		$column.append($columnTitle)
        $column.append($columnBtns)
		$columnBtns.append($columnDelete)
		$columnBtns.append($columnAddCard)
		$column.append($columnCardList);
	//zwracanie stworzonej kolumny - OBOWIĄZKOWE
		return $column;
	}
}	
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

function Card(description) {
	var self = this;

this.id = randomString();
this.description = description;
this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description'). text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete-card').text('X');

		$cardDelete.click(function(){
			self.removeCard();
		});

		$card.append($cardDelete)
			.append($cardDescription);
		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

var board = {
	name: 'Kanban Table',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}

$('.create-column').click(function(){
	var name = prompt('Write column title');
	var column = new Column(name);
	board.addColumn(column);
});		

var todoColumn = new Column('To Do');
var doingColumn = new Column('W.I.P.');
var doneColumn = new Column ('Done')

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('If You need more space to put Your text in, there will be no problem with that ;). My notes resize according to Your needs.');
var card2 = new Card('Make Kanban table');
var card3 = new Card('Rock - Paper - Scissors Game');

todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);

});