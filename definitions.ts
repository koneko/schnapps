// definitions for game classes for use while making logic

let adj = ["mala", "velika", "zanimljiva", "interesantna", "alpha", "sigma", "gamma", "beta"]
let noun = ["ptica", "tipkovnica", "casa", "kuca", "zeta", "yotta", "bravo", "charlie"]

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export enum Suit {
  Karo,
  Tref,
  Pik,
  Herc
} 

export class Card {
  public suit: Suit;
  public value: number;
  public adut: boolean = false;
  public constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
  public SetAdut(){
    this.adut = true;
  }
  public Copy(): Card {
    let nc = new Card(this.suit, this.value)
    nc.adut = this.adut
    return nc
  }
}

export class Deck {
  public cards: Array
  constructor() {
    this.cards = [ 
      new Card("Karo", 2), new Card("Karo", 3), new Card("Karo", 4), new Card("Karo", 10), new Card("Karo", 11),
      new Card("Tref", 2), new Card("Tref", 3), new Card("Tref", 4), new Card("Tref", 10), new Card("Tref", 11),
      new Card("Pik", 2), new Card("Pik", 3), new Card("Pik", 4), new Card("Pik", 10), new Card("Pik", 11),
      new Card("Herc", 2), new Card("Herc", 3), new Card("Herc", 4), new Card("Herc", 10), new Card("Herc", 11)
    ]
  }
  public DrawCard(): Card {
    let index = Math.floor(Math.random() * this.cards.length);
    if (index == 0) return false;
    let card = this.cards[index].Copy()
    this.cards.splice(index, 1)
    return card;
  }
  public GetAssociatedImage(value, cType) {
    if(value == 2) {
      return `/assets/${cType}/Jack.png`
    } else if (value == 3) {
      return `/assets/${cType}/Queen.png`
    } else if (value == 4) {
      return `/assets/${cType}/King.png`
    } else if (value == 10) {
      return `/assets/${cType}/Ten.png`
    } else if (value == 11) {
      return `/assets/${cType}/Ace.png`
    }
  } 
  public SetAdut(suit) {
    this.cards.forEach(card => {
      if(card.Suit == suit) card.SetAdut();
    })
  }
}

export class Player {
  public username: string;
  public totalPoints: number = 10;
  public gamePoints: number = 0;
  public hand: Array;
  constructor(username, roomID) {
    this.username = username;
    this.hand = [];
  }
}

export class Room {
  public displayName: string;
  public roomID: number;
  public players: Array<Player>;
  public juggernaut: number = null; // juggernaut is an index into players list, which will not change
  public maxSize: number;
  public isInGame: boolean = false;
  public markedForDeletion: boolean = false;
  constructor(maxSize): this {
    this.roomID = this.GenerateRoomID();
    this.maxSize = maxSize;
    this.players = []
    this.displayName = adj[random(0, adj.length - 1)] + "-" + noun[random(0, noun.length - 1)]
  }
  public GenerateRoomID(): number {
    return Math.floor(Math.random() * (6642261235 - 55931432 + 1) ) + 55931432;
  }
  public ToJSON(): Object { // to object to show in /rooms
    return {displayName: this.displayName, roomID: this.roomID, players: this.players.length, maxSize: this.maxSize, isInGame: this.isInGame, markedForDeletion: this.markedForDeletion}
  }
  public AddPlayerToRoom(username): boolean {
    const Userplayer = new Player(username, this.roomID);
    this.players.push()
    if(players.length > this.maxSize) { players.pop(); return false; }
    return true;
  }
  public RemovePlayerFromRoom(username): boolean {
    let user = this.IsUserInRoom(username)
    if(user) {
      if(players.indexOf(user) == 0) {
        this.markedForDeletion = true
        delete this
        return
      }
      this.players.splice(players.indexOf(user), 1)
      return true
    }
    return false
  }
  public IsUserInRoom(username): Player {
    return this.players.find((player) => player.username == username);
  }
}
