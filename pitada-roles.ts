// pitada: v3 ships no roles; re-register the fork-kept agents/ as a role pack.
import { fileURLToPath } from "node:url";

const roles = fileURLToPath(new URL("./agents", import.meta.url));

export default function pitadaRoles(pi: any) {
	const unsubscribe = pi.events.on(
		"pi-herdr-subagents:roles:discover:v1",
		(request: { apiVersion: number; register(path: string): void }) => {
			if (request.apiVersion === 1) request.register(roles);
		},
	);
	pi.on("session_shutdown", unsubscribe);
}
