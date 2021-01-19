import { TOKEN } from "@root/config";
import { regExpEsc } from "@sapphire/utilities";
import { exec as childProcessExec } from 'child_process';
import { promisify } from 'util';

const TOKENS = [process.cwd(), process.cwd().replace(/\\/g, '\\\\'), TOKEN];
const sensitiveTokens = new RegExp(TOKENS.map(regExpEsc).join('|'), 'gi');


export const clean = (text: string) => text.replace(sensitiveTokens, '「ｒｅｄａｃｔｅｄ」');

export const exec = promisify(childProcessExec);
