package io.kestra.plugin.core.dashboard.chart.timeseries;

import io.kestra.core.models.dashboards.ChartOption;
import io.kestra.core.models.dashboards.WithLegend;
import io.kestra.core.models.dashboards.WithTooltip;
import io.kestra.core.models.dashboards.charts.LegendOption;
import io.kestra.core.models.dashboards.charts.TooltipBehaviour;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@SuperBuilder(toBuilder = true)
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class TimeSeriesOption extends ChartOption implements WithLegend, WithTooltip {
    @Builder.Default
    private TooltipBehaviour tooltip = TooltipBehaviour.ALL;

    @Builder.Default
    private LegendOption legend = LegendOption.builder().enabled(true).build();

    @NotNull
    @NotBlank
    private String column;

    private String colorByColumn;

    @Override
    public List<String> neededColumns() {
        List<String> neededColumns = new ArrayList<>();

        neededColumns.add(column);
        if (colorByColumn != null) {
            neededColumns.add(colorByColumn);
        }

        return neededColumns;
    }
}
