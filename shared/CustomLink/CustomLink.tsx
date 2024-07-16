import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Fonst } from '../tokens';
import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
	return (
		<Link style={styles.link} {...props}>
			<Text>{text}</Text>
		</Link>
	);
}

const styles = StyleSheet.create({
	link: {
		fontSize: Fonst.f18,
		color: Colors.link,
	},
});
