let num = -1;
export const port = ['80','9081'];
export const socketUrl = 'ws://nio.smartlifein.com:'
export function socket() {
	num ++;
	if(num >= port.length)
		num = 0;
   	return new WebSocket(socketUrl+port[num]);
}