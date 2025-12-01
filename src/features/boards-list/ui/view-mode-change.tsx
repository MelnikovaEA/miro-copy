import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs.tsx';
import { ImageIcon, ListIcon } from 'lucide-react';

export type ViewMode = 'list' | 'cards';

type ViewModeToggleProps = {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
};

export const ViewModeToggle = ({ value, onChange }: ViewModeToggleProps) => {
    return (
        <Tabs
            defaultValue={value}
            onValueChange={(e) => onChange(e as ViewMode)}
        >
            <TabsList>
                <TabsTrigger value="list">
                    <ListIcon />
                </TabsTrigger>
                <TabsTrigger value="cards">
                    <ImageIcon />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};
