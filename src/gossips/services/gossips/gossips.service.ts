import { Injectable } from '@nestjs/common';
import { CreateGossipDTO } from 'src/gossips/dtos/create-gossip.dto';
import { SearchGossipDTO } from 'src/gossips/dtos/search-gossip.dto';
import { SearchPrefixDTO } from 'src/gossips/dtos/search-prefix.dto';
import { SearchSuffixDTO } from 'src/gossips/dtos/search-suffix.dto';
import { GossipRepository } from 'src/gossips/repositories/gossip.repository';
import { PrefixesService } from '../prefixes/prefixes.service';
import { SuffixesService } from '../suffixes/suffixes.service';
import {
  commonLanguage,
  elvishLanguage,
  dwarvishLanguage,
} from 'src/gossips/templates/racePhrases';
import { poorInn, commonInn, goodInn } from 'src/gossips/templates/innTypeText';

@Injectable()
export class GossipsService {
  constructor(
    private readonly gossipRepository: GossipRepository,
    private readonly prefixService: PrefixesService,
    private readonly suffixService: SuffixesService,
  ) {}

  async getGossipsByQuery(gossipQuery: SearchGossipDTO) {
    const race = new SearchPrefixDTO(gossipQuery.race);
    const type = new SearchSuffixDTO(gossipQuery.type);
    const gossips = await this.gossipRepository.find(gossipQuery);
    const language = this.getLanguage(race.race);
    const firstGreetings = this.getGreetings(language);
    const personalReturn = this.getPersonalReturn(type.type);
    let greetingsUsed = false;
    if (!gossips) {
      return null;
    }

    gossips.forEach((gossip) => {
      if (!greetingsUsed) {
        gossip.gossip = `${firstGreetings}. ${gossip.gossip}`;
        greetingsUsed = true;
      }
      if (gossip.gossip.includes('%placeDescription')) {
        gossip.gossip = gossip.gossip.replace(
          '%placeDescription',
          this.setInnerVars(
            '%placeDescription',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%endText')) {
        gossip.gossip = gossip.gossip.replace(
          '%endText',
          this.setInnerVars(
            '%endText',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%enemyDescription')) {
        gossip.gossip = gossip.gossip.replace(
          '%enemyDescription',
          this.setInnerVars(
            '%enemyDescription',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%conversationPhrase')) {
        gossip.gossip = gossip.gossip.replace(
          '%conversationPhrase',
          this.setInnerVars(
            '%conversationPhrase',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%negation')) {
        gossip.gossip = gossip.gossip.replace(
          '%negation',
          this.setInnerVars(
            '%negation',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%location')) {
        gossip.gossip = gossip.gossip.replace(
          '%location',
          this.setInnerVars(
            '%location',
            language,
            type.type,
            gossipQuery.threat,
          ),
        );
      }
      if (gossip.gossip.includes('%foe')) {
        gossip.gossip = gossip.gossip.replace(
          '%foe',
          this.setInnerVars('%foe', language, type.type, gossipQuery.threat),
        );
      }
      if (gossip.gossip.includes('%personalReturn')) {
        gossip.gossip = gossip.gossip.replace(
          '%personalReturn',
          personalReturn,
        );
      }
    });

    return gossips;
    // return [`${prefix || ''} ${gossipBody} ${suffix || ''}`];
  }

  async getGossips() {
    const gossips = await this.gossipRepository.findAll();
    if (!gossips) {
      return null;
    }
    return gossips;
    // return ['You were expecting some gossips? not today mate...'];
  }

  async createGossip(gossip: CreateGossipDTO) {
    const newGossip = this.gossipRepository.create(gossip);
    if (!newGossip) {
      return null;
    }
    return newGossip;
  }

  getGreetings(language: string): string {
    let fullGreeting: string;
    let arrayLength: number;
    let greeting: string;
    let character: string;
    let languageFlip: number;
    switch (language.toLowerCase()) {
      case 'common':
        arrayLength = commonLanguage.greetings.length;
        greeting =
          commonLanguage.greetings[Math.floor(Math.random() * arrayLength)];
        arrayLength = commonLanguage.characters.length;
        character =
          commonLanguage.characters[Math.floor(Math.random() * arrayLength)];
        fullGreeting = `${greeting} ${character}`;
        break;
      case 'elvish':
        arrayLength = commonLanguage.greetings.length;
        languageFlip = Math.floor(Math.random() * 2);
        if (languageFlip === 0) {
          greeting =
            elvishLanguage.greetings[Math.floor(Math.random() * arrayLength)]
              .elvish;
        } else {
          greeting =
            elvishLanguage.greetings[Math.floor(Math.random() * arrayLength)]
              .common;
        }
        arrayLength = elvishLanguage.characters.length;
        languageFlip = Math.floor(Math.random() * 2);
        if (languageFlip === 0) {
          character =
            elvishLanguage.characters[Math.floor(Math.random() * arrayLength)]
              .elvish;
        } else {
          character =
            elvishLanguage.characters[Math.floor(Math.random() * arrayLength)]
              .common;
        }
        fullGreeting = `${greeting} ${character}`;
        break;
      case 'dwarvish':
        arrayLength = dwarvishLanguage.greetings.length;
        languageFlip = Math.floor(Math.random() * 2);
        if (languageFlip === 0) {
          greeting =
            dwarvishLanguage.greetings[Math.floor(Math.random() * arrayLength)]
              .dwarvish;
        } else {
          greeting =
            dwarvishLanguage.greetings[Math.floor(Math.random() * arrayLength)]
              .common;
        }
        arrayLength = dwarvishLanguage.characters.length;
        languageFlip = Math.floor(Math.random() * 2);
        if (languageFlip === 0) {
          character =
            dwarvishLanguage.characters[Math.floor(Math.random() * arrayLength)]
              .dwarvish;
        } else {
          character =
            dwarvishLanguage.characters[Math.floor(Math.random() * arrayLength)]
              .common;
        }
        fullGreeting = `${greeting} ${character}`;
        break;
    }
    return fullGreeting.charAt(0).toUpperCase() + fullGreeting.slice(1);
  }

  getLanguage(race: string): string {
    switch (race) {
      case 'human':
        return 'common';
        break;
      case 'halfling':
        return 'common';
        break;
      case 'wooden elf':
        return 'elvish';
        break;
      case 'dwarf':
        return 'dwarvish';
        break;
      case 'gnome':
        return 'dwarvish';
        break;
      default:
        return null;
        break;
    }
  }

  getPersonalReturn(innType: string): string {
    let arrayLength: number;
    let personalReturn: string;
    switch (innType.toLowerCase()) {
      case 'poor':
        arrayLength = poorInn.personalReturn.length;
        personalReturn =
          poorInn.personalReturn[Math.floor(Math.random() * arrayLength)];
        break;
      case 'common':
        personalReturn = '';
        break;
      case 'good':
        arrayLength = goodInn.personalReturn.length;
        personalReturn =
          goodInn.personalReturn[Math.floor(Math.random() * arrayLength)];
        break;
    }
    return personalReturn;
  }

  setInnerVars(
    varName: string,
    language?: string,
    innType?: string,
    threatLevel?: string,
  ): string {
    let arrayLength: number;
    let replacedText: string;
    let languageFlip: number;
    switch (varName) {
      case '%placeDescription':
        if (innType === 'poor') {
          arrayLength = poorInn.locationDescription.length;
          replacedText =
            poorInn.locationDescription[
              Math.floor(Math.random() * arrayLength)
            ];
        } else if (innType === 'common') {
          arrayLength = commonInn.locationDescription.length;
          replacedText =
            commonInn.locationDescription[
              Math.floor(Math.random() * arrayLength)
            ];
        } else if (innType === 'good') {
          arrayLength = goodInn.locationDescription.length;
          replacedText =
            goodInn.locationDescription[
              Math.floor(Math.random() * arrayLength)
            ];
        }
        break;
      case '%endText':
        if (innType === 'poor') {
          arrayLength = poorInn.endText.length;
          replacedText =
            poorInn.endText[Math.floor(Math.random() * arrayLength)];
        } else if (innType === 'common') {
          arrayLength = commonInn.endText.length;
          replacedText =
            commonInn.endText[Math.floor(Math.random() * arrayLength)];
        } else if (innType === 'good') {
          arrayLength = goodInn.endText.length;
          replacedText =
            goodInn.endText[Math.floor(Math.random() * arrayLength)];
        }
        break;
      case '%enemyDescription':
        if (innType === 'poor') {
          arrayLength = poorInn.foe.length;
          replacedText = poorInn.foe[Math.floor(Math.random() * arrayLength)];
        } else if (innType === 'common') {
          arrayLength = commonInn.foe.length;
          replacedText = commonInn.foe[Math.floor(Math.random() * arrayLength)];
        } else if (innType === 'good') {
          arrayLength = goodInn.foe.length;
          replacedText = goodInn.foe[Math.floor(Math.random() * arrayLength)];
        }
        break;
      case '%conversationPhrase':
        if (language === 'common') {
          arrayLength = commonLanguage.conversationPhrases.length;
          replacedText =
            commonLanguage.conversationPhrases[
              Math.floor(Math.random() * arrayLength)
            ];
        } else if (language === 'elvish') {
          arrayLength = elvishLanguage.conversationPhrases.length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              elvishLanguage.conversationPhrases[
                Math.floor(Math.random() * arrayLength)
              ].elvish;
          } else {
            replacedText =
              elvishLanguage.conversationPhrases[
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        } else if (innType === 'dwarvish') {
          arrayLength = dwarvishLanguage.conversationPhrases.length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              dwarvishLanguage.conversationPhrases[
                Math.floor(Math.random() * arrayLength)
              ].dwarvish;
          } else {
            replacedText =
              dwarvishLanguage.conversationPhrases[
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        }
        break;
      case '%negation':
        if (language === 'common') {
          arrayLength = commonLanguage.negations.length;
          replacedText =
            commonLanguage.negations[Math.floor(Math.random() * arrayLength)];
        } else if (language === 'elvish') {
          arrayLength = elvishLanguage.negations.length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              elvishLanguage.negations[Math.floor(Math.random() * arrayLength)]
                .elvish;
          } else {
            replacedText =
              elvishLanguage.negations[Math.floor(Math.random() * arrayLength)]
                .common;
          }
        } else if (innType === 'dwarvish') {
          arrayLength = dwarvishLanguage.negations.length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              dwarvishLanguage.negations[
                Math.floor(Math.random() * arrayLength)
              ].dwarvish;
          } else {
            replacedText =
              dwarvishLanguage.negations[
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        }
        break;
      case '%location':
        const locationFlip = Math.floor(Math.random() * 3);
        let location: string;
        if (locationFlip === 0) {
          location = 'mountains';
        } else if (locationFlip === 1) {
          location = 'plains';
        } else {
          location = 'forests';
        }

        if (language === 'common') {
          arrayLength = commonLanguage.locations[location].length;
          replacedText =
            commonLanguage.locations[location][
              Math.floor(Math.random() * arrayLength)
            ];
        } else if (language === 'elvish') {
          arrayLength = elvishLanguage.locations[location].length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              elvishLanguage.locations[location][
                Math.floor(Math.random() * arrayLength)
              ].elvish;
          } else {
            replacedText =
              elvishLanguage.locations[location][
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        } else if (language === 'dwarvish') {
          arrayLength = dwarvishLanguage.locations[location].length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              dwarvishLanguage.locations[location][
                Math.floor(Math.random() * arrayLength)
              ].dwarvish;
          } else {
            replacedText =
              dwarvishLanguage.locations[location][
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        }
        break;
      case '%foe':
        if (language === 'common') {
          arrayLength = commonLanguage.foes[threatLevel].length;
          replacedText =
            commonLanguage.foes[threatLevel][
              Math.floor(Math.random() * arrayLength)
            ];
        } else if (language === 'elvish') {
          arrayLength = elvishLanguage.foes[threatLevel].length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              elvishLanguage.foes[threatLevel][
                Math.floor(Math.random() * arrayLength)
              ].elvish;
          } else {
            replacedText =
              elvishLanguage.foes[threatLevel][
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        } else if (language === 'dwarvish') {
          arrayLength = dwarvishLanguage.foes[threatLevel].length;
          languageFlip = Math.floor(Math.random() * 2);
          if (languageFlip === 0) {
            replacedText =
              dwarvishLanguage.foes[threatLevel][
                Math.floor(Math.random() * arrayLength)
              ].dwarvish;
          } else {
            replacedText =
              dwarvishLanguage.foes[threatLevel][
                Math.floor(Math.random() * arrayLength)
              ].common;
          }
        }
        break;
    }
    return replacedText;
  }

  getGossipBody(type: string, patrons: string, threat: string): string {
    if (threat && threat !== 'none') {
      return `it is a ${type}. Most of our customers are ${patrons}. The threat today is ${threat}.`;
    } else {
      return `it is a ${type}. Most of our customers are ${patrons}. There is no threat today!`;
    }
  }
}
