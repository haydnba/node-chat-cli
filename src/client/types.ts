import type { Socket } from 'net';
import type { Interface } from 'readline';

/**
 *
 */
export type Cipherer = (key: Buffer, message: string) => string;

/**
 *
 */
export type KeyGen = (secret: string) => Promise<Buffer | never>;

/**
 *
 */
export type ClientHandler = (
  client: Socket,
  input: Interface,
  config: ClientConfig
) => any;

/**
 *
 */
export interface ClientConfig {
  username: string;
  secret: string;
}

/**
 *
 */
export interface Message {
  username: string;
  line: string;
  ts: number;
}
