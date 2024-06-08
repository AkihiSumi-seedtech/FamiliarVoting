export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-gray-800 border-gray-400 dark:border-gray-500 text-orange-600 shadow-sm focus:ring-orange-500 dark:focus:ring-orange-600 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
